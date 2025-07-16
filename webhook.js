
module.exports = async (req, res) => {
  console.log("Pagamento confirmado:", JSON.stringify(req.body));
  res.status(200).end();
};
