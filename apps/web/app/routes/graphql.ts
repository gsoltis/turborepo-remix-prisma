import fs from "fs";
import { graphql } from "graphql";
import { ActionFunction, json } from "remix";
import { schema, context } from "server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  try {
    const results = await graphql({
      schema,
      source: body.query,
      variableValues: body.variables,
      contextValue: context,
    });

    return json(results);
  } catch (e: any) {
    return e.toString();
  }
};
