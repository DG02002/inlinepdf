import type { Route } from './+types/meesho';
import { meeshoShippingLabelsToolDefinition } from '../definitions';
import { ShippingLabelsToolScreen } from '../screen';
import { createShippingLabelRouteModule } from '../create-route-module';

const routeModule = createShippingLabelRouteModule(
  meeshoShippingLabelsToolDefinition,
  'meesho',
);

export function meta() {
  return routeModule.meta();
}

export function clientAction(args: Route.ClientActionArgs) {
  return routeModule.clientAction(args);
}

export default function MeeshoShippingLabelsRoute() {
  return (
    <ShippingLabelsToolScreen
      brand="meesho"
      title={meeshoShippingLabelsToolDefinition.title}
      description={meeshoShippingLabelsToolDefinition.shortDescription}
    />
  );
}
