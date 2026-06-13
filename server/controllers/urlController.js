const Url = require("../models/Url");
const crypto = require("crypto");

const isSafeUrl = (url) => {
  const forbiddenProtocols = ["javascript:", "data:", "vbscript:", "file:"];
  const lowerUrl = url.toLowerCase().trim();

  if (forbiddenProtocols.some((proto) => lowerUrl.startsWith(proto)))
    return false;

  const xssPattern = /<script|%3Cscript|javascript:|alert\(|onerror=/i;
  if (xssPattern.test(lowerUrl)) return false;

  return true;
};

exports.shortenUrl = async (req, res) => {
  try {
    let { longUrl, customCode } = req.body;
    const baseUrl = process.env.BASE_URL;

    console.log("Request received for URL:", longUrl);
    if (!isSafeUrl(longUrl)) {
      return res.status(400).json({
        message: "Alerta de Segurança: Esta URL contém um padrão proibido.",
      });
    }

    if (!longUrl) return res.status(400).json({ message: "A URL é obrigatória" });

    if (!longUrl.startsWith("http")) {
      longUrl = `https://${longUrl}`;
    }

    let urlCode;
    if (customCode && customCode.trim() !== "") {
      urlCode = customCode
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "");
      const existingCustom = await Url.findOne({ urlCode });
      if (existingCustom)
        return res.status(400).json({ message: "Apelido já em uso" });
    } else {
      urlCode = crypto.randomBytes(3).toString("hex");
    }

    const shortUrl = `${baseUrl}/${urlCode}`;
    const newUrl = new Url({ longUrl, shortUrl, urlCode, date: new Date() });

    await newUrl.save();
    console.log("URL Saved Successfully:", urlCode);
    return res.status(201).json(newUrl);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
