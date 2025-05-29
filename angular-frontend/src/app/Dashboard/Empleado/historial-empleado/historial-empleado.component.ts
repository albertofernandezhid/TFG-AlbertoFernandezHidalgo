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
  selectedMonth: string = new Date().toISOString().slice(5, 7);
  selectedYear: string = new Date().getFullYear().toString();

  years: string[] = [];
  registros: any[] = [];

  constructor(private http: HttpClient) {
    this.initYears();
    this.cargarRegistros();
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 10; y <= currentYear + 1; y++) {
      this.years.push(y.toString());
    }
  }

  cargarRegistros() {
    this.http.get<any[]>('http://localhost:8000/fichajes/listar').subscribe({
      next: (data) => {
        // Adaptar las propiedades para la tabla
        this.registros = data.map((reg) => ({
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
      },
      error: (err) => {
        console.error('Error cargando registros:', err);
        this.registros = [];
      },
    });
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
    return this.registros.filter((r) => {
      const year = r.fecha.slice(0, 4);
      const month = r.fecha.slice(5, 7);
      return month === this.selectedMonth && year === this.selectedYear;
    });
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
