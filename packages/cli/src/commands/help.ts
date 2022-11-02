import chalk from 'chalk';
import logo from '../util/output/logo';
import { getPkgName } from '../util/pkg-name';

interface Command {
  name: string;
  aliases?: Array<string>;
  subcommands?: Array<Command>;
  option?: string;
  description: string;
}

const commands: Array<Command> = [
  {
    name: 'alias',
    aliases: ['aliases', 'ln'],
    description: '',
  },
  {
    name: 'bisect',
    description: '',
  },
  {
    name: 'build',
    description: '',
  },
  {
    name: 'certs',
    aliases: ['cert'],
    description: '',
  },
  {
    name: 'deploy',
    description: 'Performs a deployment',
  },
  {
    name: 'dev',
    aliases: ['develop'],
    description: 'Starts a local development server',
  },
  {
    name: 'dns',
    description: '',
  },
  {
    name: 'domains',
    aliases: ['domain'],
    description: '',
  },
  {
    name: 'env',
    description: 'Manage the Environment Variables for your current Project',
  },
  {
    name: 'git',
    description: 'Manage the Git provider repository for your current Project',
  },
  {
    name: 'help',
    description: 'Display help output for [cmd]',
  },
  {
    name: 'init',
    description: 'Initialize an example project',
  },
  {
    name: 'inspect',
    description: '',
  },
  {
    name: 'link',
    description: '',
  },
  {
    name: 'list',
    aliases: ['ls'],
    description: '',
  },
  {
    name: 'login',
    description: '',
  },
  {
    name: 'logout',
    description: '',
  },
  {
    name: 'logs',
    aliases: ['log'],
    description: '',
  },
  {
    name: 'project',
    aliases: ['projects'],
    description: '',
  },
  {
    name: 'pull',
    description: '',
  },
  {
    name: 'remove',
    aliases: ['rm'],
    description: '',
  },
  {
    name: 'secrets',
    aliases: ['secret'],
    description: '',
  },
  {
    name: 'switch',
    description: '',
  },
  {
    name: 'teams',
    aliases: ['team'],
    description: '',
  },
  {
    name: 'whoami',
    description: '',
  },
];

interface Option {
  name: string;
}

const globalOptions = [];

const NEWLINE = '\n';
const SPACE = ' ';

class StringBuilder {
  _str: string;
  _col: number;
  _row: number;
  constructor() {
    this._str = '';
    this._col = 0;
    this._row = 0;
  }
  append(str: string) {
    this._str += str;
    this._col += str.length;
  }
  addWhitespaceUpTo(target: number) {
    const dif = target - 1 - this._col;
    this._str += SPACE.repeat(dif);
    this._col += dif;
  }
  addNewline() {
    this._str += NEWLINE;
    this._col = 0;
    this._row += 1;
  }
  toString() {
    return this._str;
  }
}

const basicCommandString = commands.reduce(
  (str, { name, option, description }) => {
    str.append(SPACE.repeat(6));
    str.append(name);
    str.addWhitespaceUpTo(28);
    str.append(`[${option}]`);
    str.addWhitespaceUpTo(40);
    str.append(description);
    str.append(NEWLINE);
    return str;
  },
  new StringBuilder()
);

console.log(basicCommandString.toString());

export const help = () => `
  ${chalk.bold(`${logo} ${getPkgName()}`)} [options] <command | path>

  ${chalk.dim('Commands:')}

    ${chalk.dim('Basic')}

      deploy               [path]      Performs a deployment ${chalk.bold(
        '(default)'
      )}
      dev                              Start a local development server
      env                              Manages the Environment Variables for your current Project
      git                              Manage Git provider repository for your current Project
      help                 [cmd]       Displays complete help for [cmd]
      init                 [example]   Initialize an example project
      inspect              [id]        Displays information related to a deployment
      link                 [path]      Link local directory to a Vercel Project
      ls | list            [app]       Lists deployments
      login                [email]     Logs into your account or creates a new one
      logout                           Logs out of your account
      pull                 [path]      Pull your Project Settings from the cloud
      switch               [scope]     Switches between teams and your personal account

    ${chalk.dim('Advanced')}

      alias                [cmd]       Manages your domain aliases
      bisect                           Use binary search to find the deployment that introduced a bug
      certs                [cmd]       Manages your SSL certificates
      dns                  [name]      Manages your DNS records
      domains              [name]      Manages your domain names
      logs                 [url]       Displays the logs for a deployment
      projects                         Manages your Projects
      rm | remove          [id]        Removes a deployment
      secrets              [name]      Manages your global Secrets, for use in Environment Variables
      teams                            Manages your teams
      whoami                           Shows the username of the currently logged in user

  ${chalk.dim('Options:')}

    -h, --help                     Output usage information
    -v, --version                  Output the version number
    --cwd                          Current working directory
    -V, --platform-version         Set the platform version to deploy to
    -A ${chalk.bold.underline('FILE')}, --local-config=${chalk.bold.underline(
  'FILE'
)}   Path to the local ${'`vercel.json`'} file
    -Q ${chalk.bold.underline('DIR')}, --global-config=${chalk.bold.underline(
  'DIR'
)}    Path to the global ${'`.vercel`'} directory
    -d, --debug                    Debug mode [off]
    -f, --force                    Force a new deployment even if nothing has changed
    --with-cache                   Retain build cache when using "--force"
    -t ${chalk.underline('TOKEN')}, --token=${chalk.underline(
  'TOKEN'
)}        Login token
    -p, --public                   Deployment is public (${chalk.dim(
      '`/_src`'
    )} is exposed)
    -e, --env                      Include an env var during run time (e.g.: ${chalk.dim(
      '`-e KEY=value`'
    )}). Can appear many times.
    -b, --build-env                Similar to ${chalk.dim(
      '`--env`'
    )} but for build time only.
    -m, --meta                     Add metadata for the deployment (e.g.: ${chalk.dim(
      '`-m KEY=value`'
    )}). Can appear many times.
    -S, --scope                    Set a custom scope
    --regions                      Set default regions to enable the deployment on
    --prod                         Create a production deployment
    -y, --yes                      Skip questions when setting up new project using default scope and settings

  ${chalk.dim('Examples:')}

  ${chalk.gray('–')} Deploy the current directory

    ${chalk.cyan(`$ ${getPkgName()}`)}

  ${chalk.gray('–')} Deploy a custom path

    ${chalk.cyan(`$ ${getPkgName()} /usr/src/project`)}

  ${chalk.gray('–')} Deploy with Environment Variables

    ${chalk.cyan(
      `$ ${getPkgName()} -e NODE_ENV=production -e SECRET=@mysql-secret`
    )}

  ${chalk.gray('–')} Show the usage information for the sub command ${chalk.dim(
  '`list`'
)}

    ${chalk.cyan(`$ ${getPkgName()} help list`)}

`;
