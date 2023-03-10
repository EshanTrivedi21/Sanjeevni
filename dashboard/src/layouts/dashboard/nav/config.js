// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard ',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Hospitals',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Map view',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
