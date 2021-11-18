import * as React from "react";

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1038 1.66848C13.3158 1.45654 13.5674 1.28843 13.8443 1.17373C14.1212 1.05903 14.418 1 14.7177 1C15.0174 1 15.3142 1.05903 15.5911 1.17373C15.868 1.28843 16.1196 1.45654 16.3315 1.66848C16.5435 1.88041 16.7116 2.13201 16.8263 2.40891C16.941 2.68582 17 2.9826 17 3.28232C17 3.58204 16.941 3.87882 16.8263 4.15573C16.7116 4.43263 16.5435 4.68423 16.3315 4.89617L5.43807 15.7896L1 17L2.21038 12.5619L13.1038 1.66848Z" stroke="#2F3C46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}

const MemoEditIcon = React.memo(EditIcon);
export default MemoEditIcon;
