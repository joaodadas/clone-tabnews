function status(requst: any, response: any) {
  response.status(200).json({ chave: "valor" });
}

export default status;
