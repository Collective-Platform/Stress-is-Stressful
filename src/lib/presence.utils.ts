type Animal = [string, string]

export const presenceAnimals: Animal[] = [
  ['🐶', 'Dog'],
  ['🐱', 'Cat'],
  ['🐭', 'Mouse'],
  ['🐹', 'Hamster'],
  ['🐰', 'Rabbit'],
  ['🦊', 'Fox'],
  ['🐻', 'Bear'],
  ['🐼', 'Panda'],
  ['🐨', 'Koala'],
  ['🐯', 'Tiger'],
  ['🦁', 'Lion'],
  ['🐮', 'Cow'],
  ['🐷', 'Pig'],
  ['🐸', 'Frog'],
  ['🐵', 'Monkey'],
  ['🐔', 'Chicken'],
  ['🐧', 'Penguin'],
  ['🐦', 'Bird'],
  ['🐤', 'Chick'],
  ['🦆', 'Duck'],
  ['🦅', 'Eagle'],
  ['🦉', 'Owl'],
  ['🦇', 'Bat'],
  ['🐺', 'Wolf'],
  ['🐗', 'Boar'],
  ['🐴', 'Horse'],
  ['🦄', 'Unicorn'],
  ['🐝', 'Bee'],
  ['🦋', 'Butterfly'],
  ['🐌', 'Snail'],
  ['🐢', 'Turtle'],
  ['🐍', 'Snake'],
  ['🦎', 'Lizard'],
  ['🦖', 'T-Rex'],
  ['🐙', 'Octopus'],
  ['🦑', 'Squid'],
  ['🦐', 'Shrimp'],
  ['🦞', 'Lobster'],
  ['🦀', 'Crab'],
  ['🐡', 'Blowfish'],
  ['🐠', 'Tropical Fish'],
  ['🐟', 'Fish'],
  ['🐬', 'Dolphin'],
  ['🐳', 'Whale'],
  ['🐋', 'Humpback Whale'],
  ['🦈', 'Shark'],
  ['🐊', 'Crocodile'],
  ['🦓', 'Zebra'],
  ['🦍', 'Gorilla'],
  ['🦧', 'Orangutan'],
  ['🐘', 'Elephant'],
  ['🦛', 'Hippopotamus'],
  ['🦏', 'Rhinoceros'],
  ['🦒', 'Giraffe'],
  ['🦘', 'Kangaroo'],
  ['🦔', 'Hedgehog'],
  ['🦙', 'Llama'],
  ['🐐', 'Goat'],
]

export function presenceUserAnimal(user_id: string): Animal {
  let hash = 0
  for (let i = 0; i < user_id.length; i++) {
    const char = user_id.codePointAt(i) ?? 0
    hash = (hash << 5) - hash + char
    hash = Math.trunc(hash)
  }
  const animalIndex = Math.abs(hash) % presenceAnimals.length
  return presenceAnimals[animalIndex]
}

export function presenceCountryCodeToFlag(
  code: null | string | undefined,
): null | string {
  if (!code || code.length !== 2 || code === '??') {
    return null
  }

  const codePoints = [...code.toUpperCase()].map(
    (char) => 127_397 + (char.codePointAt(0) ?? 65),
  )
  return String.fromCodePoint(...codePoints)
}

export const getAnonymousId = (): string => {
  if (typeof globalThis === 'undefined') {
    return 'server-id'
  }
  let id = localStorage.getItem('anonymous_user_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('anonymous_user_id', id)
  }
  return id
}
