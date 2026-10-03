import { DealStatus } from "@/utils/enums";
import { methodNotAllowedError } from "@/utils/server_helper";
import { createSupabaseClient } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return methodNotAllowedError(res);
  }

  const { id } = req.query;

  const supabase = createSupabaseClient(req, res);

  const { error } = await supabase
    .from("deals")
    .update({
      stage: DealStatus["production"],
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
}
