import { useState } from "react";
import { Download, Plus, Trash2, Clock, Eye, FileText } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";
import { exportElementAsPdf } from "@/components/admin/utils/exportPdf";
import { useContent, Invoice } from "@/context/content-context";

interface Servicio {
  id: number;
  descripcion: string;
  valor: string;
}


const defaultData: Omit<Invoice, 'id' | 'createdAt'> = {
  numero: "CC-001",
  fecha: new Date().toLocaleDateString("es-CO"),
  vencimiento: "",
  prestadorNombre: "Génesis Nieto",
  prestadorIdentificacion: "",
  prestadorTelefono: "",
  prestadorEmail: "",
  banco: "",
  tipoCuenta: "Cuenta de Ahorros",
  numeroCuenta: "",
  clienteNombre: "",
  clienteIdentificacion: "",
  clienteEmpresa: "",
  clienteDireccion: "",
  servicios: [{ id: 1, descripcion: "", valor: "" }],
  notas: "",
};

function calcTotal(servicios: Servicio[]): string {
  const total = servicios.reduce((acc, s) => {
    const n = parseFloat(s.valor.replace(/[^0-9.]/g, "")) || 0;
    return acc + n;
  }, 0);
  if (total === 0) return "$ —";
  return "$ " + total.toLocaleString("es-CO");
}

/* ── Vista previa imprimible ── */
function InvoicePreview({ data }: { data: Omit<Invoice, "id" | "createdAt"> }) {
  return (
    <div
      id="invoice-print"
      className="bg-white text-[#2C1A0A]"
      style={{
        width: "100%",
        minHeight: "297mm",
        padding: "14mm 16mm",
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
        fontSize: "11px",
        lineHeight: 1.6,
        boxSizing: "border-box",
      }}
    >
      {/* Encabezado */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8mm", borderBottom: "2px solid #C3A27A", paddingBottom: "6mm" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: "#2C1A0A", letterSpacing: "-0.5px" }}>
            {data.prestadorNombre || "Génesis Nieto"}
          </div>
          {data.prestadorIdentificacion && (
            <div style={{ fontSize: "10px", color: "#8A6B52" }}>C.C. {data.prestadorIdentificacion}</div>
          )}
          {data.prestadorTelefono && (
            <div style={{ fontSize: "10px", color: "#8A6B52" }}>{data.prestadorTelefono}</div>
          )}
          {data.prestadorEmail && (
            <div style={{ fontSize: "10px", color: "#8A6B52" }}>{data.prestadorEmail}</div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#C3A27A" }}>CUENTA DE COBRO</div>
          <div style={{ fontSize: "10px", color: "#8A6B52" }}>N.° {data.numero}</div>
          <div style={{ fontSize: "10px", color: "#8A6B52" }}>Fecha: {data.fecha}</div>
          {data.vencimiento && <div style={{ fontSize: "10px", color: "#8A6B52" }}>Vence: {data.vencimiento}</div>}
        </div>
      </div>

      {/* Datos bancarios */}
      {(data.banco || data.numeroCuenta) && (
        <div style={{ background: "#FAF7F2", borderRadius: "8px", padding: "4mm 6mm", marginBottom: "7mm", border: "1px solid rgba(195,162,122,0.25)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
          {data.banco && (
            <div>
              <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Banco</div>
              <div style={{ fontWeight: 600 }}>{data.banco}</div>
            </div>
          )}
          {data.tipoCuenta && (
            <div>
              <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Tipo</div>
              <div style={{ fontWeight: 600 }}>{data.tipoCuenta}</div>
            </div>
          )}
          {data.numeroCuenta && (
            <div>
              <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>N.° Cuenta</div>
              <div style={{ fontWeight: 600 }}>{data.numeroCuenta}</div>
            </div>
          )}
        </div>
      )}

      {/* Cliente */}
      <div style={{ marginBottom: "7mm" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "3px" }}>Cobrar a</div>
        <div style={{ fontWeight: 600, fontSize: "13px" }}>{data.clienteNombre || "Nombre del cliente"}</div>
        {data.clienteEmpresa && <div style={{ color: "#5A3B22" }}>{data.clienteEmpresa}</div>}
        {data.clienteIdentificacion && <div style={{ fontSize: "10px", color: "#8A6B52" }}>NIT/C.C. {data.clienteIdentificacion}</div>}
        {data.clienteDireccion && <div style={{ fontSize: "10px", color: "#8A6B52" }}>{data.clienteDireccion}</div>}
      </div>

      {/* Tabla de servicios */}
      <div style={{ marginBottom: "7mm" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2C1A0A", color: "#FAF7F2" }}>
              <th style={{ padding: "3mm 4mm", textAlign: "left", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", width: "75%" }}>Descripción del servicio</th>
              <th style={{ padding: "3mm 4mm", textAlign: "right", fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {data.servicios.filter(s => s.descripcion).map((s, i) => (
              <tr key={s.id} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FAF7F2", borderBottom: "1px solid rgba(195,162,122,0.2)" }}>
                <td style={{ padding: "3mm 4mm" }}>{s.descripcion}</td>
                <td style={{ padding: "3mm 4mm", textAlign: "right", fontWeight: 600 }}>{s.valor ? `$ ${s.valor}` : ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid #C3A27A" }}>
              <td style={{ padding: "3mm 4mm", fontWeight: 700, fontSize: "12px" }}>TOTAL</td>
              <td style={{ padding: "3mm 4mm", textAlign: "right", fontWeight: 700, fontSize: "14px", color: "#2C1A0A" }}>
                {calcTotal(data.servicios)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Notas */}
      {data.notas && (
        <div style={{ marginBottom: "7mm" }}>
          <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "3px" }}>Notas</div>
          <div style={{ color: "#5A3B22", whiteSpace: "pre-wrap", fontStyle: "italic" }}>{data.notas}</div>
        </div>
      )}

      {/* Firma */}
      <div style={{ marginTop: "14mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10mm" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderBottom: "1px solid #2C1A0A", marginBottom: "4px", height: "12mm" }} />
          <div style={{ fontSize: "10px", fontWeight: 600 }}>{data.prestadorNombre || "Génesis Nieto"}</div>
          <div style={{ fontSize: "9px", color: "#8A6B52" }}>Prestador del servicio</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderBottom: "1px solid #2C1A0A", marginBottom: "4px", height: "12mm" }} />
          <div style={{ fontSize: "10px", fontWeight: 600 }}>{data.clienteNombre || "Cliente"}</div>
          <div style={{ fontSize: "9px", color: "#8A6B52" }}>Recibido y aprobado</div>
        </div>
      </div>

      {/* Pie */}
      <div style={{ marginTop: "8mm", borderTop: "1px solid rgba(195,162,122,0.3)", paddingTop: "4mm", display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#B09070" }}>
        <span>Génesis Nieto · @genesis_nieto</span>
        <span>genesisnieto.co</span>
      </div>
    </div>
  );
}

export default function InvoiceTab() {
  const { content, updateContent } = useContent();
  const [data, setData] = useState<Omit<Invoice, 'id' | 'createdAt'>>(defaultData);
  const [showHistory, setShowHistory] = useState(false);
  
  const u = <K extends keyof Omit<Invoice, 'id' | 'createdAt'>>(key: K, val: Omit<Invoice, 'id' | 'createdAt'>[K]) =>
    setData((p) => ({ ...p, [key]: val }));

  const addServicio = () =>
    u("servicios", [...data.servicios, { id: Date.now(), descripcion: "", valor: "" }]);

  const updateServicio = (id: number, field: keyof Servicio, val: string) =>
    u("servicios", data.servicios.map((s) => s.id === id ? { ...s, [field]: val } : s));

  const removeServicio = (id: number) =>
    u("servicios", data.servicios.filter((s) => s.id !== id));

  const [exporting, setExporting] = useState(false);
  const handlePrint = async () => {
    setExporting(true);
    await exportElementAsPdf("invoice-print", `CuentaCobro_${data.numero}_${data.clienteNombre || "cliente"}.pdf`);
    setExporting(false);
  };
  
  const saveInvoice = () => {
    const newInvoice: Invoice = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    updateContent(prev => ({
      ...prev,
      invoices: {
        items: [newInvoice, ...prev.invoices.items]
      }
    }));
    
    // Reset form
    setData({
      ...defaultData,
      numero: (parseInt(data.numero.replace("CC-", "")) + 1).toString().padStart(3, "0").replace(/^/, "CC-")
    });
  };
  
  const loadInvoice = (invoice: Invoice) => {
    const { id, createdAt, ...invoiceData } = invoice;
    setData(invoiceData);
    setShowHistory(false);
  };
  
  const deleteInvoice = (id: string) => {
    updateContent(prev => ({
      ...prev,
      invoices: {
        items: prev.invoices.items.filter(i => i.id !== id)
      }
    }));
  };

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #invoice-print, #invoice-print * { visibility: visible !important; }
          #invoice-print { position: fixed; top: 0; left: 0; width: 100%; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
      <div className="flex flex-col xl:flex-row gap-6">
      {/* ── FORMULARIO ── */}
      <div className="xl:w-[45%] space-y-0">
        <Card title="Datos del documento" cols2>
          <Field label="N.° de cuenta de cobro" value={data.numero} onChange={(v) => u("numero", v)} placeholder="CC-001" />
          <Field label="Fecha" value={data.fecha} onChange={(v) => u("fecha", v)} placeholder="DD/MM/AAAA" />
          <Field label="Fecha de vencimiento" value={data.vencimiento} onChange={(v) => u("vencimiento", v)} placeholder="DD/MM/AAAA" />
        </Card>

        <Card title="Mis datos (prestador)" cols2>
          <Field label="Nombre completo" value={data.prestadorNombre} onChange={(v) => u("prestadorNombre", v)} placeholder="Génesis Nieto" />
          <Field label="C.C. / NIT" value={data.prestadorIdentificacion} onChange={(v) => u("prestadorIdentificacion", v)} placeholder="1.234.567.890" />
          <Field label="Teléfono" value={data.prestadorTelefono} onChange={(v) => u("prestadorTelefono", v)} placeholder="+57 300 000 0000" />
          <Field label="Correo" value={data.prestadorEmail} onChange={(v) => u("prestadorEmail", v)} placeholder="genesis@correo.com" />
        </Card>

        <Card title="Datos bancarios" cols2>
          <Field label="Banco" value={data.banco} onChange={(v) => u("banco", v)} placeholder="Bancolombia" />
          <Field label="Tipo de cuenta" value={data.tipoCuenta} onChange={(v) => u("tipoCuenta", v)} placeholder="Cuenta de Ahorros" />
          <div className="md:col-span-2">
            <Field label="Número de cuenta" value={data.numeroCuenta} onChange={(v) => u("numeroCuenta", v)} placeholder="123 456789 00" />
          </div>
        </Card>

        <Card title="Cliente" cols2>
          <Field label="Nombre / Razón social" value={data.clienteNombre} onChange={(v) => u("clienteNombre", v)} placeholder="Empresa SAS" />
          <Field label="NIT / C.C." value={data.clienteIdentificacion} onChange={(v) => u("clienteIdentificacion", v)} placeholder="900.123.456-7" />
          <Field label="Empresa" value={data.clienteEmpresa} onChange={(v) => u("clienteEmpresa", v)} placeholder="Nombre comercial" />
          <Field label="Dirección" value={data.clienteDireccion} onChange={(v) => u("clienteDireccion", v)} placeholder="Calle 123 #45-67, Bogotá" />
        </Card>

        <Card title="Servicios prestados">
          <div className="mb-2">
            {data.servicios.map((s) => (
              <div key={s.id} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={s.descripcion}
                  onChange={(e) => updateServicio(s.id, "descripcion", e.target.value)}
                  placeholder="Descripción del servicio"
                  className="flex-1 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2"
                  style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
                />
                <input
                  type="text"
                  value={s.valor}
                  onChange={(e) => updateServicio(s.id, "valor", e.target.value)}
                  placeholder="Valor"
                  className="w-28 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2"
                  style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
                />
                {data.servicios.length > 1 && (
                  <button onClick={() => removeServicio(s.id)} className="p-2 rounded-xl hover:bg-red-50 transition-colors" style={{ color: "#EF4444" }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            <button onClick={addServicio} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-amber-50 mt-1" style={{ color: "#C3A27A", border: "1px solid rgba(195,162,122,0.4)" }}>
              <Plus size={11} /> Añadir servicio
            </button>
          </div>
          <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: "rgba(195,162,122,0.3)" }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#8A6B52" }}>Total</span>
            <span className="text-lg font-bold" style={{ color: "#2C1A0A" }}>{calcTotal(data.servicios)}</span>
          </div>
        </Card>

        <Card title="Notas adicionales">
          <Field label="" value={data.notas} onChange={(v) => u("notas", v)} multiline rows={3} placeholder="Observaciones, forma de pago acordada, etc." />
        </Card>

        <div className="flex gap-3">
          <button
            onClick={saveInvoice}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#C3A27A", color: "#FAF8F5" }}
          >
            <Plus size={15} />
            Guardar cuenta
          </button>
          <button
            onClick={handlePrint}
            disabled={exporting}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            style={{ background: "#2C1A0A", color: "#FAF8F5" }}
          >
            {exporting ? (
              <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Generando...</>
            ) : (
              <><Download size={15} /> Descargar PDF</>
            )}
          </button>
        </div>
      </div>

      {/* ── PREVIEW ── */}
      <div className="xl:flex-1">
        <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#C3A27A" }}>Vista previa</p>
        <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: "rgba(200,168,137,0.25)" }}>
          <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.8%", pointerEvents: "none" }}>
            <InvoicePreview data={data} />
          </div>
        </div>
      </div>
      </div>

      {/* ── HISTORIAL DE CUENTAS DE COBRO ── */}
      <section style={{ marginTop: "48px" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#2C1A0A] flex items-center gap-2">
            <Clock size={20} />
            Historial de Cuentas ({content.invoices.items.length})
          </h3>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: showHistory ? "#C3A27A" : "#F5F0E8", color: showHistory ? "#FAF8F5" : "#2C1A0A" }}
          >
            {showHistory ? "Ocultar" : "Mostrar"} historial
          </button>
        </div>

        {showHistory && (
          <div className="space-y-4">
            {content.invoices.items.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed" style={{ borderColor: "#C3A27A", background: "#FAF8F5" }}>
                <FileText size={48} style={{ color: "#C3A27A", margin: "0 auto 16px" }} />
                <p className="text-sm font-medium" style={{ color: "#2C1A0A" }}>No hay cuentas guardadas</p>
                <p className="text-xs mt-2" style={{ color: "#8A6B52" }}>Las cuentas que guardes aparecerán aquí</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.invoices.items.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="group bg-white rounded-2xl border border-[#E8DFD3] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-[#E8DFD3]" style={{ background: "#FAF8F5" }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "#C3A27A", color: "#FAF8F5" }}>
                              #{invoice.numero}
                            </span>
                            <span className="text-xs" style={{ color: "#8A6B52" }}>
                              {new Date(invoice.createdAt).toLocaleDateString("es-CO")}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm" style={{ color: "#2C1A0A" }}>
                            {invoice.clienteNombre || "Sin cliente"}
                          </h4>
                          <p className="text-xs mt-1" style={{ color: "#8A6B52" }}>
                            {invoice.clienteEmpresa && `${invoice.clienteEmpresa}`}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteInvoice(invoice.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50"
                          style={{ color: "#DC2626" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="space-y-2 text-xs" style={{ color: "#6B5D4F" }}>
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-semibold">
                            {invoice.servicios.reduce((total, s) => total + (parseFloat(s.valor) || 0), 0).toLocaleString("es-CO", {
                              style: "currency",
                              currency: "COP"
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Servicios:</span>
                          <span className="font-semibold">{invoice.servicios.filter(s => s.descripcion).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vencimiento:</span>
                          <span className="font-semibold">{invoice.vencimiento || "No definido"}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => loadInvoice(invoice)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: "#2C1A0A", color: "#FAF8F5" }}
                        >
                          <Eye size={12} /> Cargar
                        </button>
                        <button
                          onClick={() => {
                            setData(invoice);
                            handlePrint();
                          }}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: "#C3A27A", color: "#FAF8F5" }}
                        >
                          <Download size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
