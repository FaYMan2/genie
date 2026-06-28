"use server";

import { revalidatePath } from "next/cache";
import { TASK_KINDS, parseModelRef, type TaskKind } from "@genie/config";
import { prisma } from "@genie/db";

/**
 * Upsert the global (default-scope) routing rule for a task. This is what the worker's
 * DbRoutingStore reads; setting it here changes which model handles that task with no
 * code change or redeploy.
 */
export async function setGlobalRouting(formData: FormData): Promise<void> {
  const task = String(formData.get("task")) as TaskKind;
  const modelRef = String(formData.get("modelRef")).trim();
  if (!TASK_KINDS.includes(task)) throw new Error(`Unknown task ${task}`);
  parseModelRef(modelRef);


  const existing = await prisma.routingRule.findFirst({
    where: { task, installationId: null, repoId: null },
  });
  if (existing) {
    await prisma.routingRule.update({ where: { id: existing.id }, data: { modelRef } });
  } else {
    await prisma.routingRule.create({
      data: { task, modelRef, installationId: null, repoId: null },
    });
  }
  revalidatePath("/");
}
