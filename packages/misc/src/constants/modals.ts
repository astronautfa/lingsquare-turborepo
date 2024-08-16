/**
 * Static Modal Pathnames
 *
 * write down all static pathnames one by one
 *
 * if you dont use static modal paths use it empty as array []
 */
export const modalStaticPathnames: string[] = [
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password",
  "/import",
  "/settings",
  "/settings/languages",
  "/settings/display",
  "/settings/notifications",
  "/settings/billing",
  "/import-youtube",
  "/create-deck"
];

/**
 * Dynamic Modal Pathnames
 *
 * in dynamic pathanmes only write the parent pathname
 * so the modals will be a child to this pathname
 * such as '/photos/1' or '/photos/some-picture/ or else.
 *
 * if you dont use dynamic modal paths use it empty as array []
 */
export const modalDynamicPathnames: string[] = ["/photos"];
