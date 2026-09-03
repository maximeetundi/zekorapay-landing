<script setup lang="ts">
// Anime un chiffre de 0 jusqu'à sa valeur finale (bande de stats de la home)
// — déclenché à l'entrée dans le viewport (IntersectionObserver), pas au
// montage brut : sur mobile la bande de stats est plus bas que le hero, sans
// ça l'animation se jouerait hors écran avant que le visiteur ne la voie.
// SSR-safe : la valeur initiale du ref est toujours la valeur finale (ce que
// le HTML statique prérendu affiche déjà) — la remise à zéro n'a lieu qu'au
// montage côté client, jamais pendant le rendu serveur, donc aucune
// divergence d'hydratation.
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1400 });

const displayValue = ref(props.value);
const elRef = ref<HTMLElement | null>(null);

// Sépare préfixe non numérique ("$"), la partie numérique ("100", "0.99"),
// et le suffixe ("+") — une valeur sans partie numérique (ex. "—" quand le
// prix n'est pas configuré) reste affichée telle quelle, jamais animée.
const match = props.value.match(/^([^\d]*)([\d,.]+)(.*)$/);
const prefix = match?.[1] ?? "";
const numStr = match?.[2] ?? "";
const suffix = match?.[3] ?? "";
const target = numStr ? Number.parseFloat(numStr.replace(/,/g, "")) : null;
const decimals = numStr.includes(".") ? numStr.split(".")[1]!.length : 0;

function formatNumber(n: number): string {
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
}

let animated = false;
function animate(): void {
  if (animated || target === null) return;
  animated = true;
  const start = performance.now();
  const duration = props.duration;

  function tick(now: number): void {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3; // ease-out cubic — démarre vite, ralentit en fin de course
    displayValue.value = `${prefix}${formatNumber(target! * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

onMounted(() => {
  if (target === null) return;
  displayValue.value = `${prefix}${formatNumber(0)}${suffix}`;

  if (!("IntersectionObserver" in window)) {
    animate();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animate();
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  if (elRef.value) observer.observe(elRef.value);
});
</script>

<template>
  <span ref="elRef">{{ displayValue }}</span>
</template>
