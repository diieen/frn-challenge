import type { ClientsConfig, ServiceContext } from "@vtex/api";
import { LRUCache, Service, method } from "@vtex/api";
import { Clients } from "./clients";
import { saveProductReport } from "./resolvers/saveProductReport";

const TIMEOUT_MS = 800;

const memoryCache = new LRUCache<string, any>({ max: 5000 });

metrics.trackCache("status", memoryCache);

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
};

declare global {
  type Context = ServiceContext<Clients>;
}

export default new Service({
  clients,
  routes: {
    saveProductReport: method({
      POST: saveProductReport,
    }),
  },
});
