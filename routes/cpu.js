import express from 'express';
import { supabase } from '../server.js'; // atau import langsung jika prefer

const router = express.Router();

// GET all CPU
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cpu_parts')
      .select('*')
      .order('rank_num', { ascending: true });

    if (error) throw error;
    res.json({ data, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('cpu_parts').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ error: 'Not found' });
  res.json({ data });
});

// CREATE
router.post('/', async (req, res) => {
  const { data, error } = await supabase.from('cpu_parts').insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ data, success: true });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('cpu_parts').update(req.body).eq('id', id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data, success: true });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('cpu_parts').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, message: 'Deleted' });
});

export default router;