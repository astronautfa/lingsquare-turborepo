
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
  SidebarSpacer,
} from '@ui/components'
import { AccountSwitcher } from './account-switcher';
import SidebarItem from './sidebar-item';
import { ModeToggle } from './mode-toggle';

import Image from 'next/image';
import French from "../../public/French.svg";
import English from "../../public/English.svg";
import German from "../../public/German.svg";
import Spanish from "../../public/Spanish.svg";
import SidebarSearch from './sidebar-search';
import {
  BooksRegular,
  BooksSolid,
  ExploreRegular,
  ExploreSolid,
  HistoryRegular,
  HistorySolid,
  ImportRegular,
  ImportSolid,
  NotesRegular,
  NotesSolid,
  ReviewRegular,
  ReviewSolid,
  SettingsRegular,
  SettingsSolid
} from '@ui/icons';


const learningLanguages = [
  {
    label: "Learning French",
    email: "Learning French",
    icon: (
      <Image
        priority
        src={French}
        alt="French"
        height={20}
        width={20}
      />
    ),
  },
  {
    label: "Learning German",
    email: "Learning German",
    icon: (
      <Image
        priority
        src={German}
        alt="German"
        height={20}
        width={20}
      />
    ),
  },
  {
    label: "Learning English",
    email: "Learning English",
    icon: (
      <Image
        priority
        src={English}
        alt="English"
        height={20}
        width={20}
      />
    ),
  },
]

const speakingLanguages = [
  {
    label: "Native in Spanish",
    email: "Native in Spanish",
    icon: (
      <Image
        priority
        src={Spanish}
        alt="Spanish"
        height={20}
        width={20}
      />
    ),
  },
  {
    label: "Fluent in German",
    email: "Fluent in German",
    icon: (
      <Image
        priority
        src={German}
        alt="German"
        height={20}
        width={20}
      />
    ),
  },
]

const sidebarNavItems = {
  header:
    [
      {
        title: "Library",
        href: "/library",
        icons: { regular: <BooksRegular className="h-[18px] w-[18px]" />, selected: <BooksSolid className="h-[18px] w-[18px]" /> }
      },
      {
        title: "Import",
        href: "/import",
        icons: { regular: <ImportRegular className="h-5 w-5" />, selected: <ImportSolid className="h-5 w-5" /> }
      },
    ],
  body:
    [
      {
        title: "Explore",
        href: "/",
        icons: { regular: <ExploreRegular className="h-5 w-5" />, selected: <ExploreSolid className="h-5 w-5" /> }
      },
      {
        title: "Review",
        href: "/review",
        icons: { regular: <ReviewRegular className="h-[18px] w-[18px]" />, selected: <ReviewSolid className="h-[18px] w-[18px]" /> }
      },
      {
        title: "Notes",
        href: "/notes",
        icons: { regular: <NotesRegular className="h-[18px] w-[18px]" />, selected: <NotesSolid className="h-[18px] w-[18px]" /> }
      },
      {
        title: "History",
        href: "/history",
        icons: { regular: <HistoryRegular className="h-[18px] w-[18px]" />, selected: <HistorySolid className="h-[18px] w-[18px]" /> }
      },
    ]
  ,
  footer: [
    {
      title: "Settings",
      href: "/settings",
      icons: { regular: <SettingsRegular className="h-5 w-5" />, selected: <SettingsSolid className="h-5 w-5" /> }
    },
  ]
}

const LingsquareSidebar = ({ collapsed }: { collapsed: boolean }) => {

  return (
    <Sidebar>
      <SidebarHeader>
        <AccountSwitcher isCollapsed={collapsed} learningLanguages={learningLanguages} speakingLanguages={speakingLanguages} />
        <SidebarSearch isCollapsed={collapsed} />
        <SidebarSection className="max-lg:hidden" id="main-header">
          {/* <SidebarItem collapsed={collapsed} href="/import" label={'Back'}>
            <BackwardIcon />
          </SidebarItem> */}
          {sidebarNavItems.header.map((navItem, index) => (
            <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} layoutId='main-header' />
          ))}
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection id="main-body">
          {sidebarNavItems.body.map((navItem, index) => (
            <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} layoutId='main-body' />
          ))}
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter>
        <ModeToggle collapsed={collapsed} />
        <SidebarSection id="main-footer">
          {sidebarNavItems.footer.map((navItem, index) => (
            <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} layoutId='main-footer' />
          ))}
        </SidebarSection>
      </SidebarFooter>
    </Sidebar>
  )
}

export default LingsquareSidebar
