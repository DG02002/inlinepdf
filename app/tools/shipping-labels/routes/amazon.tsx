import type { Route } from './+types/amazon';
import { amazonShippingLabelsToolDefinition } from '../definitions';
import { ShippingLabelsToolScreen } from '../screen';
import { createShippingLabelRouteModule } from '../create-route-module';

const routeModule = createShippingLabelRouteModule(
  amazonShippingLabelsToolDefinition,
  'amazon',
);

export function meta() {
  return routeModule.meta();
}

export function clientAction(args: Route.ClientActionArgs) {
  return routeModule.clientAction(args);
}

export default function AmazonShippingLabelsRoute() {
  return (
    <ShippingLabelsToolScreen
      brand="amazon"
      title={amazonShippingLabelsToolDefinition.title}
      description={amazonShippingLabelsToolDefinition.shortDescription}
    />
  );
}
