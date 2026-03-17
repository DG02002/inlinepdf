import type { Route } from './+types/flipkart';
import { flipkartShippingLabelsToolDefinition } from '../definitions';
import { ShippingLabelsToolScreen } from '../screen';
import { createShippingLabelRouteModule } from '../create-route-module';

const routeModule = createShippingLabelRouteModule(
  flipkartShippingLabelsToolDefinition,
  'flipkart',
);
export function meta() {
  return routeModule.meta();
}

export function clientAction(args: Route.ClientActionArgs) {
  return routeModule.clientAction(args);
}

export default function FlipkartShippingLabelsRoute() {
  return (
    <ShippingLabelsToolScreen
      brand="flipkart"
      title={flipkartShippingLabelsToolDefinition.title}
      description={flipkartShippingLabelsToolDefinition.shortDescription}
    />
  );
}
