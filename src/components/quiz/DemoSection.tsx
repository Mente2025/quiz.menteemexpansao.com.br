import { DiaryGallery } from "@/components/quiz/DiaryGallery";
import { finalPage, type DemoVideo } from "@/config/quizData";

/**
 * "Veja como é começar a se escolher": vídeo real da plataforma (quando
 * configurado) e galeria com páginas reais do Diário dos 21 Dias.
 * Textos e arquivos: `finalPage.demo` em src/config/quizData.ts.
 */
export function DemoSection() {
  const { demo } = finalPage;
  const video = demo.video.file;

  return (
    <section aria-labelledby="demo-titulo" className="mt-14">
      <h2
        id="demo-titulo"
        className="text-balance font-display text-[length:clamp(1.5rem,6.6vw,2rem)] font-medium leading-[1.18] tracking-[-0.015em] text-ink"
      >
        {demo.title}
      </h2>
      <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-graphite">
        {demo.subtitle}
      </p>

      {video && (
        <div className="mt-8">
          <h3 className="text-center font-display text-[1.375rem] font-medium leading-snug text-ink">
            {demo.video.label}
          </h3>
          <PlatformVideo video={video} />
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-balance text-center font-display text-[1.375rem] font-medium leading-snug text-ink">
          {demo.diary.title}
        </h3>
        <p className="mx-auto mt-2 max-w-[32ch] text-pretty text-center leading-relaxed text-graphite">
          {demo.diary.subtitle}
        </p>
        <div className="-mx-5 mt-5 sm:-mx-6">
          <DiaryGallery pages={demo.diary.pages} labels={demo.diary.labels} />
        </div>
      </div>
    </section>
  );
}

/**
 * Player do vídeo da plataforma: toca só quando a pessoa aperta o play,
 * sem som, com controles nativos e capa tirada do próprio vídeo. O arquivo
 * só começa a baixar quando ela aperta o play.
 */
function PlatformVideo({ video }: { video: DemoVideo }) {
  return (
    <video
      controls
      muted
      playsInline
      preload="none"
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-label={video.description}
      className="mx-auto mt-4 block h-auto max-h-[70svh] w-auto max-w-full rounded-2xl border border-line bg-paper"
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
