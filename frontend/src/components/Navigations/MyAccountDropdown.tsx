import React, { useRef } from 'react';
import { Spacer } from '../ui/spacer';
import type { UserType } from '../../store/userData/reducer';
import { cn } from '../../lib/utils';
import { IconLogout } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
  userData: UserType['data']['data'];
};
export function MyAccountDropdown({ userData }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'HeaderSection.MyAccount',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    });

    return () => document.removeEventListener('click', () => {});
  }, []);

  function handleLogout() {
    localStorage.removeItem('persist:root');
    window.location.reload();
  }

  return (
    <div className='relative' ref={containerRef} title='My Account'>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          open ? 'bg-gray-400' : '',
          'border-2 border-white hover:text-white shadow-md relative rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-500 transition-all cursor-pointer'
        )}
      >
        <p>{userData?.isAdmin ? '👑' : '👤'}</p>
      </div>

      {open && (
        <div className='absolute top-10 right-0 w-[260px] bg-white/90 shadow-lg  rounded-md z-50 p-3 gap-2 flex flex-col'>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p className='line-clamp-1'>
              <b>{t('username')}: </b>
              {userData?.userName}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p className='line-clamp-1'>
              <b>{t('fullName')}: </b>
              {userData?.name + ' ' + userData?.lastName || ''}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p className='line-clamp-1'>
              <b>{t('role')}: </b>
              {userData?.isAdmin ? 'Admin' : 'User'}
            </p>
          </div>
          <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
            <p className=' wrap-break-word '>
              <b>{t('email')}: </b>
              {userData?.email}
            </p>
          </div>
          <Spacer size={2} />
          <Link to={`/orders`}>
            <div className='  px-2 relative rounded-sm w-full flex-col flex   transition-all '>
              <p className=' wrap-break-word '>
                <b>{t('myOrders')} </b>
              </p>
            </div>
          </Link>
          <Spacer size={4} />
          <div
            onClick={handleLogout}
            className='hover:text-white  p-2 relative rounded-sm w-full justify-between items-center flex  hover:bg-gray-400 transition-all cursor-pointer'
          >
            <b>{t('logout')}</b>
            <IconLogout size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
