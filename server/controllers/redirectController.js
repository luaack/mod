const Url = require("../models/Url");

exports.redirect = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      url.clicks++;
      await url.save();

      return res.status(302).redirect(url.longUrl);
    } else {
      return res.status(404).json("URL não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Erro no servidor");
  }
};
