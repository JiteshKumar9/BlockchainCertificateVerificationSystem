const Setting = require('../models/Setting');

const DEFAULTS = {
  backgroundImageUrl: '/certificate-bg.png',
  backgroundOpacity: 0.38,
  gradientOpacity: 0.45,
  veilOpacity: 0.04,
  gradientEnabled: true,
};

exports.getPdfDefaults = async (req, res) => {
  try {
    const doc = await Setting.findOne({ key: 'pdfDefaults' });
    res.json(doc?.value || DEFAULTS);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
};

exports.setPdfDefaults = async (req, res) => {
  try {
    const allowed = ['backgroundImageUrl', 'backgroundOpacity', 'gradientOpacity', 'veilOpacity', 'gradientEnabled'];
    const value = {};
    for (const k of allowed) if (k in req.body) value[k] = req.body[k];
    const updated = await Setting.findOneAndUpdate(
      { key: 'pdfDefaults' },
      { key: 'pdfDefaults', value: { ...DEFAULTS, ...value }, updatedBy: req.user?.id },
      { upsert: true, new: true }
    );
    res.json(updated.value);
  } catch (e) {
    res.status(500).json({ message: 'Failed to save settings' });
  }
};
