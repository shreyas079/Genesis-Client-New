import * as React from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import history from './history';
export function useBlocker(blocker, when = true) {
    React.useEffect(() => {
        if (!when) return;
        const unblock = history.block((tx) => {
          const autoUnblockingTx = {
            ...tx,
            retry() {
              unblock();
              tx.retry();
            }
          };
          blocker(autoUnblockingTx);
        });
        return unblock;
      }, [blocker, when]);
}
