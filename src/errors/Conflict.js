export default function ConflictError(entity) {
  return {
    type: 'conflict',
    message: `${entity} already exists!`,
  };
}
