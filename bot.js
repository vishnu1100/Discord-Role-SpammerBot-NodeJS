require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember],
});

// Load from .env
const TOKEN = '';
const GUILD_ID = '';
const OWNER_ID = '';
const NUMBER_OF_ROLES = 250;

// Word banks for random name generation
const emojis = [
  '😂','🧻','🍟','🧠','💀','🐸','👽','🦄','🌶️','🥸','🚀','💩',
  '😎','🎩','🕶️','🥵','😴','👻','🦖','🐢','🐍','🐙','🕷️','🦴','🍄','🍕','🍔','🍳','🍉','🍇','🍌','🌮'
];

const adjectives = [
  'Spicy','Lazy','Cursed','Cool','Fluffy','Dank','Evil','Sneaky','Broken','Shiny','Bouncy','Tired',
  'Funky','Noisy','Wobbly','Tiny','Giant','Invisible','Magical','Sus','Fake','Edgy','Dope','Soggy',
  'Haunted','Slimy','Cringey','Clueless','Cracked','Confused','Loud','Extra','Memeified'
];

const nouns = [
  'Wizard','Ninja','Toilet','Overlord','Duck','Banana','Potato','Goblin','Turtle','Chair','Microwave',
  'Grandma','Keyboard','Sock','Taco','Alien','Frog','Robot','Witch','Dragon','Toaster','Unicorn','Snail',
  'Pickle','Llama','Trashcan','Pumpkin','Sandwich','Shark','Broccoli','Gnome','Cabbage','Yeti','Chad'
];

// Generate a unique funny name
function generateFunnyName() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${emoji} ${adj} ${noun}`;
}

// Generate random hex color
function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 0xffffff);
  return `#${randomColor.toString(16).padStart(6, '0')}`;
}

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const owner = await guild.members.fetch(OWNER_ID);

  let createdCount = 0;
  const usedNames = new Set(guild.roles.cache.map(r => r.name));

  while (createdCount < NUMBER_OF_ROLES) {
    const roleName = generateFunnyName();

    if (usedNames.has(roleName)) {
      console.log(`⚠️ Role "${roleName}" already exists. Skipping.`);
      continue;
    }

    const role = await guild.roles.create({
      name: roleName,
      color: getRandomColor(),
      permissions: [],
      reason: 'Automatically generated funny role',
    });

    await owner.roles.add(role);
    usedNames.add(roleName);
    createdCount++;

    console.log(`🎉 Created and assigned role: "${roleName}"`);
  }

  console.log('✅ All roles created and assigned!');
});

client.login(TOKEN);
