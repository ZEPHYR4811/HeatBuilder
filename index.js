const fs=require('fs');
const chalk=require('chalk');
const {
    Client, Collection, Intents, MessageEmbed,
}=require('discord.js');

const intents=new Intents();
intents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
);

const client=new Client({intents, partials: ['MESSAGE', 'REACTION'], allowedMentions: {parse: ['users']}});
require('dotenv').config();

client.SlashCommands=new Collection();
const commandFiles=fs.readdirSync('./slashcmds').filter((file) => file.endsWith('.js'));


process.on('unhandledRejection', (error) => {
    console.log(error);
});

const {REST}=require('@discordjs/rest');
const {Routes}=require('discord-api-types/v9');

const commands=[];
for (const file of commandFiles) {
    const command=require(`./slashcmds/${ file }`);
    commands.push(command.data.toJSON());
}

const rest=new REST({version: '9'}).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log(chalk.yellowBright('Started refreshing application [/] commands.'));

        await rest.put(
            Routes.applicationCommands("1029924294207209552"),
            {body: commands},
        );
        console.log(chalk.greenBright('Successfully reloaded application [/] commands.'));
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', async () => {
    client.user.setActivity('your builds!', {type: 'LISTENING'});
});

client.once('ready', async () => {
    for (const file of commandFiles) {
        console.log(`${ chalk.yellowBright('[SLASH COMMAND LOADED]') } ${ file }`);
    }
    console.log(chalk.greenBright('Ready!'));
});
for (const file of commandFiles) {
    const command=require(`./slashcmds/${ file }`);
    client.SlashCommands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
    if (interaction.isAutocomplete()&&interaction.commandName==="build") {
        const focusedValue=interaction.options.getFocused();
        const choices=[
  "Acura NSX 2017 Sportscar",
  "Acura RSX-S 2004 Coupe",
  "Alfa Romeo Giulia Quadrofoglio 2016 Performance",
  "Aston Martin DB11 2017 Sportscar",
  "Aston Martin DB5 1964 Classic",
  "Aston Martin Vulcan 2016 Hypercar",
  "Audi R8 V10 Performance Coupe 2019 Supercar",
  "Audi S5 Sportback 2017 Performance",
  "BMW M2 Competition 2019 Performance",
  "BMW M3 2006 Performance",
  "BMW M3 2010 Performance",
  "BMW M3 E46 GTR 2006 Coupe",
  "BMW M3 Evolution II 1988 Performance",
  "BMW M4 2018 Performance",
  "BMW M4 Convertible 2018 Open-top",
  "BMW M4 GTS 2016 Performance",
  "BMW M5 2018 Performance",
  "BMW X6 M 2016 SUV",
  "BMW Z4 M40i 2020 Open-top",
  "BMW i8 Coupe 2018 Sportscar",
  "BMW i8 Roadster 2018 Open-top",
  "Buick Grand National 1987 Muscle",
  "Chevrolet Bel Air 1955 Classic",
  "Chevrolet C10 Stepside Pickup 1965 Classic",
  "Chevrolet Camaro SS 1967 Classic",
  "Chevrolet Camaro Z28 2014 Muscle",
  "Chevrolet Colorado ZR2 2017 Pickup",
  "Chevrolet Corvette Grand Sport 2017 Sportscar",
  "Chevrolet Corvette Z06 2013 Sportscar",
  "Chevrolet Corvette ZR1 Coupe 2019 Sportscar",
  "Dodge Challenger SRT8 2014 Muscle",
  "Dodge Charger 1969 Classic",
  "Ferrari 458 Italia 2014 Supercar",
  "Ferrari 458 Spider 2014 Supercar",
  "Ferrari 488 GTB 2015 Supercar",
  "Ferrari 488 Pista 2019 Supercar",
  "Ferrari F40 1988 Supercar",
  "Ferrari FXX-K Evo 2018 Hypercar",
  "Ferrari LaFerrari 2016 Hypercar",
  "Ferrari Testarossa Coupé 1984 Supercar",
  "Ford F-150 Raptor (FEM from NFSP) 2016 Pickup",
  "Ford F-150 Raptor 2016 Pickup",
  "Ford Focus RS 2016 Hot Hatch",
  "Ford GT 2017 Supercar",
  "Ford Mustang 1965 Classic",
  "Ford Mustang BOSS 302 1969 Classic",
  "Ford Mustang Foxbody 1990 Muscle",
  "Ford Mustang GT 2015 Muscle",
  "Honda Civic Type-R 2000 Hot Hatch",
  "Honda Civic Type-R 2015 Hot Hatch",
  "Honda NSX Type-R 1992 Sportscar",
  "Honda S2000 2009 Open-top",
  "Infiniti Q60S 2017 Sportscar",
  "Jaguar F-Type R Convertible 2019 Open-top",
  "Jaguar F-Type R Coupe 2017 Sportscar",
  "Koenigsegg Regera 2016 Hypercar",
  "Lamborghini Aventador S 2018 Open-top",
  "Lamborghini Aventador S Roadster 2018 Open-top",
  "Lamborghini Aventador SVJ Coupe 2019 Supercar",
  "Lamborghini Aventador SVJ Roadster 2019 Open-top",
  "Lamborghini Countach 25th Anniversary 1989 Supercar",
  "Lamborghini Diablo SV 1995 Supercar",
  "Lamborghini Huracan 2018 Supercar",
  "Lamborghini Huracan Performante 2018 Supercar",
  "Lamborghini Huracan Performante Spyder 2018 Open-top",
  "Lamborghini Huracan Spyder 2018 Open-top",
  "Lamborghini Murciélago SV 2010 Supercar",
  "Land Rover Defender 110 Double Cab Pickup 2016 Offroad",
  "Land Rover Range Rover Sport SVR 2015 SUV",
  "Lotus Exige S 2006 Trackday",
  "Mazda MX5 1996 Open-top",
  "Mazda MX5 2015 Open-top",
  "Mazda RX-7 Spirit R 2002 Coupe",
  "McLaren 570S 2015 Supercar",
  "McLaren 570S Spider 2018 Open-top",
  "McLaren 600LT 2018 Supercar",
  "McLaren P1 2015 Hypercar",
  "McLaren P1 GTR 2015 Hypercar",
  "Mercedes-AMG A 45 2014 Hot Hatch",
  "Mercedes-AMG C63 Coupe 2018 Coupe",
  "Mercedes-AMG G63 2017 SUV",
  "Mercedes-AMG GT 2015 Sportscar",
  "Mercedes-AMG GT R 2017 Sportscar",
  "Mercedes-AMG GT S Roadster 2019 Open-top",
  "Mercury Cougar 1967 Classic",
  "Mini Countryman John Cooper Works 2017 Hot Hatch",
  "Mitsubishi Lancer Evolution IX 2007 Rally",
  "Mitsubishi Lancer Evolution X 2008 Rally",
  "Nissan 180SX Type X 1996 Coupe",
  "Nissan 350Z (Rachel's from NFSU2) 2003 Coupe",
  "Nissan 350Z 2008 Coupe",
  "Nissan 370Z 50th Anniversary Edition 2018 Coupe",
  "Nissan 370Z Nismo 2018 Coupe",
  "Nissan Fairlady 240ZG 1971 Coupe",
  "Nissan GT-R 2017 Supercar",
  "Nissan GT-R Nismo 2017 Supercar",
  "Nissan Silvia Spec-R Aero 2002 Coupe",
  "Nissan Skyline 2000 GT-R 1971 Coupe",
  "Nissan Skyline GT-R (Eddie's from NFSU) 2002 Coupe",
  "Nissan Skyline GT-R VSpec 1993 Coupe",
  "Nissan Skyline GT-R VSpec 1999 Coupe",
  "Pagani Huayra BC 2017 Hypercar",
  "Plymouth Barracuda 1970 Classic",
  "Polestar Polestar 1 2020 Coupe",
  "Pontiac Firebird 1977 Classic",
  "Porsche 718 Cayman GTS 2018 Sportscar",
  "Porsche 911 Carrera GTS 2018 Sportscar",
  "Porsche 911 Carrera GTS Cabriolet 2018 Open-top",
  "Porsche 911 Carrera RSR 2.8 1973 Sportscar",
  "Porsche 911 Carrera S 1996 Sportscar",
  "Porsche 911 GT2 RS 2018 Supercar",
  "Porsche 911 GT3 RS 2019 Sportscar",
  "Porsche 911 Targa 4 GTS 2018 Sportscar",
  "Porsche 911 Turbo S Exclusive Series 2018 Sportscar",
  "Porsche 911 Turbo S Exclusive Series Cabriolet 2018 Open-top",
  "Porsche 918 Spyder 2015 Hypercar",
  "Porsche Cayman GT4 2015 Sportscar",
  "Porsche Panamera Turbo 2017 Performance",
  "SRT Viper GTS 2014 Sportscar",
  "Subaru BRZ Premium 2014 Coupe",
  "Subaru Impreza WRX STI 2006 Rally",
  "Subaru Impreza WRX STI 2010 Rally",
  "Volkswagen Beetle 1963 Hot Hatch",
  "Volkswagen Golf GTI 1976 Hot Hatch",
  "Volkswagen Golf GTI Clubsport 2016 Hot Hatch",
  "Volvo 242DL 1975 Sedan",
  "Volvo Amazon P130 1970 Classic",
];

        if (focusedValue.length <=1) {
            return interaction.respond([])
        }
        const filtered=choices.filter(choice => choice.toLowerCase().includes(focusedValue.toLowerCase()));
        await interaction.respond(
            filtered.map(choice => ({name: choice, value: choice}))
        )
        return;
    }
    const command=client.SlashCommands.get(interaction.commandName);

    if (!command) return;
    console.log(`${ chalk.yellowBright('[EVENT FIRED]') } interactionCreate with command ${ interaction.commandName }`);
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        interaction.reply({content: `${ error }`, ephemeral: true});
    }
});
client.login(process.env.TOKEN);
