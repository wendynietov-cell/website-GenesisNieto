import { useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { Field, Card, inputBase } from "@/components/admin/shared";

interface Entregable {
  id: number;
  texto: string;
}

interface ProposalData {
  numero: string;
  fecha: string;
  validez: string;
  // Cliente
  clienteNombre: string;
  clienteEmpresa: string;
  clienteEmail: string;
  // Propuesta
  titulo: string;
  descripcion: string;
  entregables: Entregable[];
  // Precios
  precio: string;
  formaPago: string;
  tiempoEntrega: string;
  revisiones: string;
  // Extras
  notas: string;
}

const defaultData: ProposalData = {
  numero: "001",
  fecha: new Date().toLocaleDateString("es-CO"),
  validez: "15 días",
  clienteNombre: "",
  clienteEmpresa: "",
  clienteEmail: "",
  titulo: "",
  descripcion: "",
  entregables: [{ id: 1, texto: "" }],
  precio: "",
  formaPago: "50% al inicio · 50% al finalizar",
  tiempoEntrega: "",
  revisiones: "2 rondas de revisión incluidas",
  notas: "",
};

/* ── Vista previa imprimible ── */
function ProposalPreview({ data }: { data: ProposalData }) {
  return (
    <div
      id="proposal-print"
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10mm", borderBottom: "2px solid #C3A27A", paddingBottom: "6mm" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 700, color: "#2C1A0A", letterSpacing: "-0.5px" }}>
            Génesis Nieto
          </div>
          <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C3A27A", marginTop: "2px" }}>
            UGC Creator · Entrenadora Personal · Creadora de Contenido
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#C3A27A" }}>PROPUESTA</div>
          <div style={{ fontSize: "10px", color: "#8A6B52" }}>N.° {data.numero}</div>
          <div style={{ fontSize: "10px", color: "#8A6B52" }}>Fecha: {data.fecha}</div>
          <div style={{ fontSize: "10px", color: "#8A6B52" }}>Válida por: {data.validez}</div>
        </div>
      </div>

      {/* Para */}
      <div style={{ marginBottom: "8mm" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "3px" }}>Dirigida a</div>
        <div style={{ fontWeight: 600, fontSize: "13px" }}>{data.clienteNombre || "Nombre del cliente"}</div>
        {data.clienteEmpresa && <div style={{ color: "#5A3B22" }}>{data.clienteEmpresa}</div>}
        {data.clienteEmail && <div style={{ color: "#8A6B52", fontSize: "10px" }}>{data.clienteEmail}</div>}
      </div>

      {/* Servicio propuesto */}
      <div style={{ background: "#FAF7F2", borderRadius: "8px", padding: "6mm", marginBottom: "8mm", border: "1px solid rgba(195,162,122,0.25)" }}>
        <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "4px" }}>Servicio propuesto</div>
        <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{data.titulo || "Título del servicio"}</div>
        <div style={{ color: "#5A3B22", whiteSpace: "pre-wrap" }}>{data.descripcion}</div>
      </div>

      {/* Entregables */}
      {data.entregables.some(e => e.texto) && (
        <div style={{ marginBottom: "8mm" }}>
          <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "4px" }}>Entregables</div>
          <ul style={{ margin: 0, paddingLeft: "16px" }}>
            {data.entregables.filter(e => e.texto).map((e) => (
              <li key={e.id} style={{ marginBottom: "2px" }}>{e.texto}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Inversión */}
      <div style={{ marginBottom: "8mm", border: "1px solid rgba(195,162,122,0.4)", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ background: "#2C1A0A", color: "#FAF7F2", padding: "3mm 6mm", fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Inversión
        </div>
        <div style={{ padding: "5mm 6mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
          <div>
            <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Valor total</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#2C1A0A" }}>{data.precio || "$ —"}</div>
          </div>
          <div>
            <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Forma de pago</div>
            <div style={{ fontSize: "11px" }}>{data.formaPago}</div>
          </div>
          <div>
            <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Tiempo de entrega</div>
            <div style={{ fontSize: "11px" }}>{data.tiempoEntrega}</div>
          </div>
          <div>
            <div style={{ fontSize: "8px", color: "#C3A27A", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Revisiones</div>
            <div style={{ fontSize: "11px" }}>{data.revisiones}</div>
          </div>
        </div>
      </div>

      {/* Notas */}
      {data.notas && (
        <div style={{ marginBottom: "8mm" }}>
          <div style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C3A27A", marginBottom: "4px" }}>Notas adicionales</div>
          <div style={{ color: "#5A3B22", whiteSpace: "pre-wrap", fontStyle: "italic" }}>{data.notas}</div>
        </div>
      )}

      {/* Pie */}
      <div style={{ marginTop: "auto", borderTop: "1px solid rgba(195,162,122,0.3)", paddingTop: "5mm", display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#B09070" }}>
        <span>Génesis Nieto · @genesis_nieto</span>
        <span>genesisnieto.co</span>
      </div>
    </div>
  );
}

export default function ProposalTab() {
  const [data, setData] = useState<ProposalData>(defaultData);
  const u = <K extends keyof ProposalData>(key: K, val: ProposalData[K]) =>
    setData((p) => ({ ...p, [key]: val }));

  const addEntregable = () =>
    u("entregables", [...data.entregables, { id: Date.now(), texto: "" }]);

  const updateEntregable = (id: number, texto: string) =>
    u("entregables", data.entregables.map((e) => e.id === id ? { ...e, texto } : e));

  const removeEntregable = (id: number) =>
    u("entregables", data.entregables.filter((e) => e.id !== id));

  const handlePrint = () => window.print();

  return (
    <>
    <style>{`
      @media print {
        body * { visibility: hidden !important; }
        #proposal-print, #proposal-print * { visibility: visible !important; }
        #proposal-print { position: fixed; top: 0; left: 0; width: 100%; }
        @page { size: A4; margin: 0; }
      }
    `}</style>
    <div className="flex flex-col xl:flex-row gap-6">
      {/* ── FORMULARIO ── */}
      <div className="xl:w-[45%] space-y-0">
        <Card title="Datos del documento" cols2>
          <Field label="N.° de propuesta" value={data.numero} onChange={(v) => u("numero", v)} placeholder="001" />
          <Field label="Fecha" value={data.fecha} onChange={(v) => u("fecha", v)} placeholder="DD/MM/AAAA" />
          <Field label="Válida por" value={data.validez} onChange={(v) => u("validez", v)} placeholder="15 días" />
        </Card>

        <Card title="Cliente" cols2>
          <Field label="Nombre completo" value={data.clienteNombre} onChange={(v) => u("clienteNombre", v)} placeholder="Ana García" />
          <Field label="Empresa / Marca" value={data.clienteEmpresa} onChange={(v) => u("clienteEmpresa", v)} placeholder="Marca XYZ" />
          <div className="md:col-span-2">
            <Field label="Correo electrónico" value={data.clienteEmail} onChange={(v) => u("clienteEmail", v)} placeholder="ana@marca.com" />
          </div>
        </Card>

        <Card title="El servicio">
          <Field label="Título de la propuesta" value={data.titulo} onChange={(v) => u("titulo", v)} placeholder="Ej: Paquete UGC 10 videos" />
          <Field label="Descripción" value={data.descripcion} onChange={(v) => u("descripcion", v)} multiline rows={4} placeholder="Describe detalladamente lo que incluye el servicio..." />

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A6B52" }}>Entregables</label>
              <button onClick={addEntregable} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors hover:bg-amber-50" style={{ color: "#C3A27A", border: "1px solid rgba(195,162,122,0.4)" }}>
                <Plus size={11} /> Añadir
              </button>
            </div>
            {data.entregables.map((e) => (
              <div key={e.id} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={e.texto}
                  onChange={(ev) => updateEntregable(e.id, ev.target.value)}
                  placeholder="Ej: 5 videos UGC de 30 segundos"
                  className="flex-1 px-3 py-2 rounded-xl text-sm outline-none focus:ring-2"
                  style={{ ...inputBase, "--tw-ring-color": "#C8A889" } as React.CSSProperties}
                />
                {data.entregables.length > 1 && (
                  <button onClick={() => removeEntregable(e.id)} className="p-2 rounded-xl hover:bg-red-50 transition-colors" style={{ color: "#EF4444" }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Inversión" cols2>
          <Field label="Precio total" value={data.precio} onChange={(v) => u("precio", v)} placeholder="$ 500.000" />
          <Field label="Tiempo de entrega" value={data.tiempoEntrega} onChange={(v) => u("tiempoEntrega", v)} placeholder="7 días hábiles" />
          <div className="md:col-span-2">
            <Field label="Forma de pago" value={data.formaPago} onChange={(v) => u("formaPago", v)} placeholder="50% al inicio · 50% al finalizar" />
          </div>
          <div className="md:col-span-2">
            <Field label="Revisiones incluidas" value={data.revisiones} onChange={(v) => u("revisiones", v)} placeholder="2 rondas de revisión" />
          </div>
        </Card>

        <Card title="Notas adicionales">
          <Field label="" value={data.notas} onChange={(v) => u("notas", v)} multiline rows={3} placeholder="Términos, condiciones especiales, etc." />
        </Card>

        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "#2C1A0A", color: "#FAF8F5" }}
        >
          <Download size={15} />
          Descargar propuesta en PDF
        </button>
      </div>

      {/* ── PREVIEW ── */}
      <div className="xl:flex-1">
        <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#C3A27A" }}>Vista previa</p>
        <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: "rgba(200,168,137,0.25)" }}>
          <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.8%", pointerEvents: "none" }}>
            <ProposalPreview data={data} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
