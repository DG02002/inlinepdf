import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider"

export function DirectionProvider(
  props: React.ComponentProps<typeof BaseDirectionProvider>
) {
  return <BaseDirectionProvider {...props} />
}
