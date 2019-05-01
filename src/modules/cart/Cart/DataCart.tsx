import { CartQuery } from "@src/generated/graphql";
import { QueryResult } from "react-apollo";
export interface DataCart extends QueryResult, CartQuery.Query {}
