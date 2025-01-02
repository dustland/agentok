import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  FolderKanban,
  List,
  Plus,
  Image,
  X,
  Upload,
  Settings,
  User,
  LogOut,
  Sparkles,
  Zap,
  Filter,
  Save,
  AlertTriangle,
  Skull,
  Brain,
  Flame,
  Repeat,
  ShoppingBag,
  Check,
  Loader2,
  Trash2,
  MoreVertical,
  Edit,
  Inbox,
  MessageSquare,
  Shuffle,
  Compass,
  Send,
  Square,
  Bot,
  Copy,
  RefreshCw,
  Code,
  type LucideIcon,
  HardHat,
  Share2,
  EyeOff,
  Eye,
  Key,
  Home,
  GitFork,
  Heart,
  Code2,
  Hammer,
  Brackets,
  Braces,
  Download,
  Pin,
  PinOff,
  Menu,
  BadgeCheck,
  Grip,
  Users,
  Rocket,
  Notebook,
  Search,
  MessageCircleQuestion,
  Brush,
  ExternalLink,
  Megaphone,
  CheckCircle,
  Sun,
  Moon,
  Laptop,
  MessagesSquare,
} from 'lucide-react';
import { Logo } from './logo';

export type Icon = LucideIcon;

export const Icons = {
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  chevronUp: ChevronUp,
  checkCircle: CheckCircle,
  externalLink: ExternalLink,
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  brush: Brush,
  megaphone: Megaphone,
  project: FolderKanban,
  list: List,
  question: MessageCircleQuestion,
  code: Code2,
  search: Search,
  rocket: Rocket,
  note: Notebook,
  badgeCheck: BadgeCheck,
  draggable: Grip,
  add: Plus,
  braces: Braces,
  menu: Menu,
  pin: Pin,
  unpin: PinOff,
  download: Download,
  refresh: RefreshCw,
  tool: Hammer,
  eye: Eye,
  eyeOff: EyeOff,
  image: Image,
  close: X,
  upload: Upload,
  settings: Settings,
  spy: HardHat,
  user: User,
  logout: LogOut,
  sparkles: Sparkles,
  zap: Zap,
  filter: Filter,
  key: Key,
  save: Save,
  alert: AlertTriangle,
  share: Share2,
  skull: Skull,
  brain: Brain,
  fire: Flame,
  gitFork: GitFork,
  heart: Heart,
  group: Users,
  home: Home,
  swap3: Repeat,
  shoppingBag: ShoppingBag,
  spinner: Loader2,
  check: Check,
  trash: Trash2,
  more: MoreVertical,
  edit: Edit,
  inbox: Inbox,
  chat: MessagesSquare,
  shuffle: Shuffle,
  compass: Compass,
  send: Send,
  stop: Square,
  robot: Bot,
  robotActive: Bot,
  copy: Copy,
  reload: RefreshCw,
  codeBlock: Code,
  userVoiceLine: User,
  userVoiceFill: User,
  voiceprintLine: MessageSquare,
  github: ({ ...props }: any) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: any) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  resize: ({ ...props }: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="yellowgreen"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  ),
  logo: Logo,
  node: ({ ...props }: any) => (
    <svg {...props} viewBox="0 0 1024 1024" width="200" height="200"><path d="M512 512a128 128 0 1 1-256 0 128 128 0 0 1 256 0z m-192 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0zM512 512a128 128 0 1 0 256 0 128 128 0 0 0-256 0z m192 0a64 64 0 1 1-128 0 64 64 0 0 1 128 0zM544.64 720.085333a173.482667 173.482667 0 0 0 87.68-47.36l44.8 45.44A236.8 236.8 0 0 1 512 786.645333a240.768 240.768 0 0 1-90.88-18.56 233.088 233.088 0 0 1-76.16-50.56l44.8-45.44a173.525333 173.525333 0 0 0 154.88 47.36v0.64z" p-id="7746"></path><path d="M608 96a96 96 0 0 1-64 90.538667V192h160A192 192 0 0 1 896 384v64l64 64v128L896 704V768a192 192 0 0 1-192 192h-384A192 192 0 0 1 128 768v-64L64 640v-128L128 448V384a192 192 0 0 1 192-192h160v-5.461333a96 96 0 1 1 128-90.538667zM320 256a128 128 0 0 0-128 128v384a128 128 0 0 0 128 128h384a128 128 0 0 0 128-128V384a128 128 0 0 0-128-128h-384z" p-id="7747"></path></svg>
  ),
} as const;
