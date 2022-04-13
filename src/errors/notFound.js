export default function NotFoundError(entity) {
  return {
    type: 'error_not_found',
    message: `Could not find specified "${entity}"!`,
  };
}
