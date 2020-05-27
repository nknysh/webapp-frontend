import React from 'react';
import { Helmet } from 'react-helmet';

export interface SnippetProps {
  appId: string;
}

const Snippet = ({ appId }: SnippetProps) =>
  <Helmet>
    <script type="text/javascript">
      {`
        (function(h, o, t, j, a, r) {
          h.hj =
            h.hj ||
            function() {
              (h.hj.q = h.hj.q || []).push(arguments);
            };
          h._hjSettings = { hjid: ${appId}, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      `}
    </script>
  </Helmet>;


export default Snippet;