import { NextApiRequest, NextApiResponse } from "next";
import { setPreviewData, redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "../../services/prismicio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = createClient({ req });

  await setPreviewData({ req, res });

  return await redirectToPreviewURL({ req, res, client });
}
