import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userModel } from 'entities/user';
import { useShallowSelector } from 'shared';


export const WithPostMessage: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
          console.log(event.data, 'testpost')
          if (event.origin === window.location.origin) return;
          if (!event.data.reputation_requester) return;
          
            dispatch(userModel.userActions.updateUserState({
              postMessage: {
                type: event.data.type,
                data: event.data.payload,
                reputation_requester: event.data.reputation_requester,
                achievement: event.data.achievement,
                reputation_module: event.data.reputation_module
            }
            }))
          
        };
    
        window.addEventListener('message', handleMessage);
    
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }, []);

    return (
        <>
            {children}
        </>
    );
};
