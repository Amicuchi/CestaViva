export default function formatarData(data) {
  const date = new Date(data);
  return date.toLocaleDateString("pt-BR");
}
