
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { AccountSwitcher } from './account-switcher';
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/20/solid'
import { SidebarItem } from './sidebar-item';
import { ModeToggle } from './mode-toggle';

import French from "../../public/French.svg";
import English from "../../public/English.svg";
import German from "../../public/German.svg";
import Spanish from "../../public/Spanish.svg";
import Image from 'next/image';
import { BackwardIcon } from '@heroicons/react/20/solid';

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


const LingsquareSidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <AccountSwitcher isCollapsed={collapsed} learningLanguages={learningLanguages} speakingLanguages={speakingLanguages} />
        <SidebarSection className="max-lg:hidden">
          {/* <SidebarItem collapsed={collapsed} href="/import" label={'Back'}>
            <BackwardIcon />
          </SidebarItem> */}
          <SidebarItem collapsed={collapsed} href="/library" label={'Library'}>
            <BookOpenIcon />
          </SidebarItem>
          <SidebarItem collapsed={collapsed} href="/import" label={'Import'}>
            <PlusIcon />
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem collapsed={collapsed} href="/" label={'Explore'}>
            <MagnifyingGlassIcon />
          </SidebarItem>
          <SidebarItem collapsed={collapsed} href="/study" label={'Study'}>
            <AcademicCapIcon />
          </SidebarItem>
          <SidebarItem collapsed={collapsed} href="/history" label={'History'}>
            <ClockIcon />
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>
      <SidebarFooter className="max-lg:hidden">
        <SidebarItem collapsed={collapsed} href="/settings" label={'Settings'}>
          <Cog6ToothIcon />
        </SidebarItem>
        <SidebarItem collapsed={collapsed} href="/support" label={'Support'}>
          <QuestionMarkCircleIcon />
        </SidebarItem>
        <ModeToggle collapsed={collapsed} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default LingsquareSidebar
