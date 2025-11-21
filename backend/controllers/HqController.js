const hqService = require('../services/HqService');

exports.getHq = async (req, res) => {
  try {
    const hq = await hqService.getHq();
    res.json(hq);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.updateHq = async (req, res) => {
  try {
    const hq = await hqService.updateHq(req.body);
    res.json(hq);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.deleteHq = async (req, res) => {
  try {
    const result = await hqService.deleteHq();
    res.json({ message: 'HQ excluída com sucesso', result });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.saveHq = async (req, res) => {
  try {
    const hq = await hqService.saveHq(req.body);
    res.status(201).json(hq);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};