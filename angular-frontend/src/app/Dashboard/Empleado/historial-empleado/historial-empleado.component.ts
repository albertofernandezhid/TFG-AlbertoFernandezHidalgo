import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-historial-empleado',
  templateUrl: './historial-empleado.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class HistorialEmpleadoComponent {
  selectedMonth: string = '';
  selectedYear: string = '';

  availableMonths: { value: string; label: string }[] = [];
  availableYears: string[] = [];
  registros: any[] = [];

  private monthNames = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' }
  ];

  constructor(private http: HttpClient) {
    this.cargarRegistros();
    
    // Recargar datos cada 30 segundos para detectar nuevos registros
    setInterval(() => {
      this.cargarRegistros();
    }, 30000);
  }

  cargarRegistros() {
    this.http.get<any[]>('http://localhost:8000/fichajes/listar').subscribe({
      next: (data) => {
        // Adaptar las propiedades para la tabla
        this.registros = data.map((reg) => ({
          tipo: reg.tipo || '',
          fecha: reg.fecha,
          entrada: reg.horaEntrada || '',
          salida: reg.horaSalida || '',
          totalHoras: this.calcularTotalHoras(reg.horaEntrada, reg.horaSalida),
          lugar: reg.lugar || '',
          evento: reg.evento || '',
          comentarios: reg.comentarios || '',
          gastos: reg.gastos || '',
          archivos: reg.archivos || '',
        }));

        // Actualizar los filtros disponibles después de cargar los datos
        this.updateAvailableFilters();
      },
      error: (err) => {
        console.error('Error cargando registros:', err);
        this.registros = [];
        this.availableMonths = [];
        this.availableYears = [];
      },
    });
  }

  updateAvailableFilters() {
    // Filtrar solo registros de tipo 'salida' que tienen fecha
    const registrosSalida = this.registros.filter(r => r.tipo === 'salida' && r.fecha);
    
    if (registrosSalida.length === 0) {
      this.availableMonths = [];
      this.availableYears = [];
      this.selectedMonth = '';
      this.selectedYear = '';
      return;
    }

    // Extraer años únicos de los registros
    const yearsSet = new Set<string>();
    registrosSalida.forEach(registro => {
      const fecha = new Date(registro.fecha);
      yearsSet.add(fecha.getFullYear().toString());
    });
    
    this.availableYears = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a)); // Más recientes primero

    // Si no hay año seleccionado o el año seleccionado ya no existe, seleccionar el más reciente
    if (!this.selectedYear || !this.availableYears.includes(this.selectedYear)) {
      this.selectedYear = this.availableYears[0] || '';
    }

    // Actualizar meses disponibles para el año seleccionado
    this.updateAvailableMonths();
  }

  updateAvailableMonths() {
    if (!this.selectedYear) {
      this.availableMonths = [];
      this.selectedMonth = '';
      return;
    }

    // Filtrar registros del año seleccionado
    const registrosDelAño = this.registros.filter(r => {
      if (r.tipo !== 'salida' || !r.fecha) return false;
      const fecha = new Date(r.fecha);
      return fecha.getFullYear().toString() === this.selectedYear;
    });

    // Extraer meses únicos
    const monthsSet = new Set<string>();
    registrosDelAño.forEach(registro => {
      const fecha = new Date(registro.fecha);
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      monthsSet.add(mes);
    });

    // Crear array de meses disponibles con sus nombres
    const availableMonthValues = Array.from(monthsSet).sort();
    this.availableMonths = availableMonthValues.map(month => {
      const monthName = this.monthNames.find(m => m.value === month);
      return {
        value: month,
        label: monthName ? monthName.label : month
      };
    });

    // Si no hay mes seleccionado o el mes seleccionado ya no existe para este año, seleccionar el más reciente
    if (!this.selectedMonth || !availableMonthValues.includes(this.selectedMonth)) {
      this.selectedMonth = availableMonthValues[availableMonthValues.length - 1] || '';
    }
  }

  calcularTotalHoras(entrada: string, salida: string): string {
    if (!entrada || !salida) return '';
    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSalida, mSalida] = salida.split(':').map(Number);

    let totalMinutos = hSalida * 60 + mSalida - (hEntrada * 60 + mEntrada);
    if (totalMinutos < 0) totalMinutos += 24 * 60;

    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;

    return `${horas}h ${minutos}m`;
  }

  get registrosFiltrados() {
    return this.registros
      .filter((r) => {
        // Solo registros de tipo 'salida'
        if (r.tipo !== 'salida') return false;
        
        // Filtrar por mes y año seleccionados
        if (r.fecha && this.selectedMonth && this.selectedYear) {
          const fechaRegistro = new Date(r.fecha);
          const mesRegistro = (fechaRegistro.getMonth() + 1).toString().padStart(2, '0');
          const añoRegistro = fechaRegistro.getFullYear().toString();
          
          return mesRegistro === this.selectedMonth && añoRegistro === this.selectedYear;
        }
        
        return false;
      })
      .sort((a, b) => {
        // Ordenar por fecha descendente (más recientes primero)
        if (!a.fecha || !b.fecha) return 0;
        
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        
        return fechaB.getTime() - fechaA.getTime();
      });
  }

  // Método para actualizar cuando cambie el año
  onYearChange() {
    this.updateAvailableMonths();
  }

  // Método para actualizar cuando cambie el mes
  onMonthChange() {
    // No necesita lógica adicional ya que registrosFiltrados es un getter
  }

  get showYearFilter(): boolean {
    return this.availableYears.length > 1;
  }

  exportPdf() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Registro Horario', 14, 22);

    const columns = [
      { header: 'Fecha', dataKey: 'fecha' },
      { header: 'Entrada', dataKey: 'entrada' },
      { header: 'Salida', dataKey: 'salida' },
      { header: 'Total horas', dataKey: 'totalHoras' },
      { header: 'Lugar', dataKey: 'lugar' },
      { header: 'Evento', dataKey: 'evento' },
      { header: 'Comentarios', dataKey: 'comentarios' },
      { header: 'Gastos', dataKey: 'gastos' },
      { header: 'Archivos', dataKey: 'archivos' },
    ];

    (doc as any).autoTable({
      head: [columns.map((col) => col.header)],
      body: this.registrosFiltrados.map((reg) =>
        columns.map((col) => reg[col.dataKey] || '')
      ),
      startY: 30,
      styles: { fontSize: 8 },
    });

    doc.save('registro_horario.pdf');
  }
}