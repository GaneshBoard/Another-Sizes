import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [total, setTotal] = useState(100000); // El total de la compra
  const [referencia, setReferencia] = useState("REF123"); // Genera una referencia única
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/pagar", { total, referencia });
      console.log(data); // Aquí se manejará la respuesta de Wompi

      // Aquí se puede hacer algo con la respuesta, por ejemplo, redirigir a una página de éxito
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Resumen de la compra</h2>
      <p>Total a pagar: ${total}</p>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Procesando..." : "Pagar con Wompi"}
      </button>
    </div>
  );
};

export default Checkout;
