const nom = ref('ana')

nom.value = 'ben'

console.log(nom.value)

///---

const age = ref(18)
const isMinor = ref(false)
const isMinor = computed(() => age.value < 18)
isMinor.value

// ...