import { LucideProps } from 'lucide-react';

interface LogoProps extends LucideProps {
  simple?: boolean; // if true, only show the logo with current color
}

export const Logo = ({ simple, ...props }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="400"
    height="400"
    viewBox="50 50 300 300"
    {...props}
  >
    <g
      id="group13"
      data-name="group 13"
      transform="translate(-6327.091 -1946.904)"
    >
      <g id="group_11" data-name="group 11">
        <path
          id="path_10"
          data-name="path 10"
          d="M6641.667,2098.986h-34.12v47.143c0,44.936-36.762,82.865-81.7,82.549a81.116,81.116,0,0,1-80.533-80.533c-.315-44.934,37.614-81.7,82.55-81.7h47.143v-34.121a68.937,68.937,0,0,1,7.85-31.905h-53.825c-81.513,0-150.315,66.686-149.742,148.2A147.142,147.142,0,0,0,6525.377,2294.7c81.51.572,148.2-68.23,148.2-149.742v-53.826A68.937,68.937,0,0,1,6641.667,2098.986Z"
          fill={'currentColor'}
        />
        <path
          id="path_11"
          data-name="path 11"
          d="M6607.344,2033.474v33.178h33.178c18.71,0,34.5-15.308,34.372-34.018a33.775,33.775,0,0,0-33.533-33.532C6622.651,1998.97,6607.344,2014.763,6607.344,2033.474Z"
          fill={simple ? 'currentColor' : '#50C878'}
        />
        <path
          id="path_12"
          data-name="path 12"
          d="M6574.154,2146.7v-47.861h-47.861c-26.992,0-49.774,22.082-49.585,49.072a48.724,48.724,0,0,0,48.374,48.373C6552.072,2196.477,6574.154,2173.694,6574.154,2146.7Z"
          fill={simple ? 'currentColor' : '#50C878'}
        />
      </g>
      <g id="group_12" data-name="group 12">
        <rect
          id="rect_6"
          data-name="rect 6"
          width="400"
          height="400"
          transform="translate(6327.091 1946.904)"
          fill="none"
        />
      </g>
    </g>
  </svg>
);
