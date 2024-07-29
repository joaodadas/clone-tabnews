import database from "../../../../infra/database";

async function status(requst: any, response: any) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "valor" });
}

export default status;
