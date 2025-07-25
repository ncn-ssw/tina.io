import Link from 'next/link';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import GradGlow from '../../../public/svg/grad-glow.svg';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';

const Feature = ({ data, id }) => {
  const { headline, text, actions, url } = data;

  const formattedUrl =
    url && !url.match(/^https?:\/\//) && !url.startsWith('/')
      ? `http://${url}`
      : url;
  const isInternalLink = formattedUrl?.startsWith('/');

  return !isInternalLink ? (
    <a
      href={formattedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-6 px-8 md:py-9 md:px-11 lg:py-12 lg:px-14 rounded-sm bg-linear-to-br from-white via-white to-white/50 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),0_0_1px_1px_rgba(223,219,252,0.5)] transition duration-500 hover:scale-105 hover:bg-linear-to-br hover:from-orange-200 hover:via-orange-400 hover:to-orange-600 hover:z-20"
      style={{ textDecoration: 'none', overflow: 'visible' }}
      id={id}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col gap-4"
      >
        {headline && (
          <h3 className="text-2xl md:text-xl lg:text-2xl font-ibm-plex leading-tight text-transparent bg-linear-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text mb-2 group-hover:text-white break-words">
            {headline}
          </h3>
        )}
        {text && <p className="group-hover:text-white">{text}</p>}
        {actions && <Actions items={actions} />}
      </div>
    </a>
  ) : (
    <Link
      href={formattedUrl}
      className="h-full w-full group block py-6 px-8 md:py-9 md:px-11 lg:py-12 lg:px-14 rounded-sm bg-linear-to-br from-white via-white to-white/50 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),0_0_1px_1px_rgba(223,219,252,0.5)] transition duration-500 hover:scale-105 hover:bg-linear-to-br hover:from-orange-200 hover:via-orange-400 hover:to-orange-600 hover:z-20"
      style={{ textDecoration: 'none', overflow: 'visible' }}
      id={id}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col gap-4"
      >
        {headline && (
          <h3 className="text-2xl md:text-xl lg:text-2xl font-ibm-plex leading-tight text-transparent bg-linear-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text mb-2 group-hover:text-white break-words">
            {headline}
          </h3>
        )}
        {text && <p className="group-hover:text-white">{text}</p>}
        {actions && <Actions items={actions} />}
      </div>
    </Link>
  );
};

export default Feature;

export function FeatureGridBlock({ data, index }) {
  const isMoreThanSix = data.items && data.items.length > 6;
  return (
    <section
      key={`feature-grid-${index}`}
      className={'relative z-0 w-full pb-20'}
      style={{ overflow: 'visible' }}
    >
      <Container width="wide">
        <div
          className={`grid gap-[0.5px] ${
            isMoreThanSix
              ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
              : 'grid-flow-row grid-cols-auto-sm md:grid-cols-auto-lg'
          } auto-rows-auto w-full rounded-xl overflow-visible shadow border border-blue-50/50 bg-linear-to-br from-seafoam-200/30 to-blue-100/30`}
        >
          {data.items?.map((data) => {
            return (
              <Feature
                key={Object.values(data).join('')}
                data={data}
                id={sanitizeLabel(data.headline)}
              />
            );
          })}
        </div>
      </Container>
      <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" />
    </section>
  );
}
