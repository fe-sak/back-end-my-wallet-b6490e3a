export default function errorHandler(error, req, res, next) {
  if (error.type === 'conflict') return res.sendStatus(409);
  if (error.type === 'unauthorized') return res.sendStatus(401);
  if (error.type === 'unprocessable entity') return res.sendStatus(422);
  console.log(error);
  return res.sendStatus(500);
}
