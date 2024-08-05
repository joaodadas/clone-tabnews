import database from "infra/database";

async function status(requst: any, response: any) {
  const updatedAt = new Date().toISOString();

  response.status(200).json({ updated_At: updatedAt });
}

export default status;
