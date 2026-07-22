// Validates request body / query / params using a Zod schema
export const validate = (schema, source = 'body') => (req, res, next) => {
  const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
  const result = schema.safeParse(data);
  if (!result.success) {
    res.status(400);
    const messages = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
    throw new Error(messages.join('; '));
  }
  if (source === 'body') req.body = result.data;
  if (source === 'query') req.query = result.data;
  next();
};
