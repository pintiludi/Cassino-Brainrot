
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: "eyJhbGciOiJIUzI1NiJ9...SEU_TOKEN_REAL_COMPLETO"
});
module.exports = async (req, res) => {
  const { amount, userId } = req.body;
  try {
    const pref = await mercadopago.preferences.create({
      items: [{ title: "Depósito Tralalelo Spin", quantity: 1, unit_price: parseFloat(amount), currency_id: "BRL" }],
      back_urls: { success: "https://seusite.com/sucesso" },
      notification_url: "https://seusite.com/api/webhook",
      external_reference: userId
    });
    res.status(200).json({ init_point: pref.body.init_point });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
