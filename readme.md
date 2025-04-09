# 🤖 Discord Role Spammer Bot (Funny Role Generator)

This bot automatically creates and assigns a bunch of **funny**, **randomly colored** roles to the server owner. Great for memes, testing, or chaotic servers!

---

## 🎉 Features

- Random role names with emoji + adjective + noun combos
- Random hex color for each role
- Assigns each created role to the owner
- Skips duplicate role names
- Configurable with `.env`
- Supports up to **250 roles** (Discord's max limit)

---

## ⚙️ Setup

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/discord-role-spammer.git
cd discord-role-spammer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_server_id_here
OWNER_ID=your_discord_user_id_here
NUMBER_OF_ROLES=1000
```

> ⚠️ You can only create up to **250 roles per server** (Discord limit). This script will stop when it reaches that limit.

### 4. Start the bot

```bash
npm start
```

---

## 🚀 Example Output

```
✅ Logged in as FunnyBot#1234
🎉 Created and assigned role: "🧻 Lazy Wizard"
🎉 Created and assigned role: "💀 Spicy Toilet"
🎉 Created and assigned role: "🍟 Funky Overlord"
...
✅ All roles created and assigned!
```

---

## 🧹 Optional Cleanup

To delete all dummy roles before re-running, you can add this snippet before generating roles:

```js
const rolesToDelete = guild.roles.cache.filter(role => role.editable && !role.managed && role.name.includes(' '));
for (const role of rolesToDelete.values()) {
  await role.delete('Cleanup before regeneration');
  console.log(`🗑️ Deleted role: ${role.name}`);
}
```

---

## 🧠 Credits

Created by [YourName](https://github.com/yourusername) for fun and Discord chaos 😎  
Inspired by emoji memes, randomness, and too many roles.

---

## 📜 License

MIT License
