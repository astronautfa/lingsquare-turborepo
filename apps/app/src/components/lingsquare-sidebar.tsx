
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

import French from "../../public/French.svg";
import English from "../../public/English.svg";
import German from "../../public/German.svg";
import Spanish from "../../public/Spanish.svg";
import Image from 'next/image';
import SidebarSearch from './sidebar-search';
import { BooksRegular, BooksSolid, ExploreRegular, ExploreSolid, HistoryRegular, HistorySolid, ImportRegular, ImportSolid, ReviewRegular, ReviewSolid, SettingsRegular, SettingsSolid } from '@ui/icons';


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
        icons: { regular: <BooksRegular className="h-5 w-5" />, selected: <BooksSolid className="h-5 w-5" /> }
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
        icons: { regular: <ReviewRegular className="h-5 w-5" />, selected: <ReviewSolid className="h-5 w-5" /> }
      },
      {
        title: "History",
        href: "/history",
        icons: { regular: <HistoryRegular className="h-5 w-5" />, selected: <HistorySolid className="h-5 w-5" /> }
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
        <SidebarSection className="max-lg:hidden">
          {/* <SidebarItem collapsed={collapsed} href="/import" label={'Back'}>
            <BackwardIcon />
          </SidebarItem> */}
          {sidebarNavItems.header.map((navItem, index) => (
            <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} />
          ))}
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          {sidebarNavItems.body.map((navItem, index) => (
            <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} />
          ))}
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <ModeToggle collapsed={collapsed} />
        {sidebarNavItems.footer.map((navItem, index) => (
          <SidebarItem key={index} collapsed={collapsed} href={navItem.href} label={navItem.title} selectedIcon={navItem?.icons.selected} regularIcon={navItem?.icons.regular} />
        ))}
      </SidebarFooter>
    </Sidebar>
  )
}

export default LingsquareSidebar
