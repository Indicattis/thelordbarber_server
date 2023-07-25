const express = require("express");
const axios = require("axios");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

router.post("/", async (req, res) => {
  const { phoneNumber, companyFrom, enforceSecureValidation, expireInMinutes } = req.body;
  const authToken = "597abeb7-4cd6-4f3a-b012-8b428f1ef146";

  const url = "https://sms.comtele.com.br/api/v2/tokenmanager";
  const headers = {
    "Content-Type": "application/json",
    "auth-key": authToken,
  };
  const data = {
    PhoneNumber: phoneNumber,
    Prefix: companyFrom,
    EnforceSecureValidation: enforceSecureValidation,
    ExpireInMinutes: expireInMinutes,
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao fazer a requisição." });
  }
});

module.exports = router;