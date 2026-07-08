import pkgutil
import importlib
from pathlib import Path

from ..extensions import ExtendedAgent
from .supabase import SupabaseClient


class ExtensionService:
    def __init__(self, supabase: SupabaseClient, extensions_path: str):
        self.extensions_path = extensions_path
        self.supabase = supabase

    def load_extensions(self):
        extensions_metadata = []
        seen = set()
        paths = [self.extensions_path]
        agent_dir = Path(self.extensions_path) / "agent"
        if agent_dir.is_dir():
            paths.append(agent_dir.as_posix())

        for search_path in paths:
            is_agent_subdir = Path(search_path).name == "agent"
            package = (
                "agentok_api.extensions.agent"
                if is_agent_subdir
                else "agentok_api.extensions"
            )
            for _, name, _ in pkgutil.iter_modules([search_path]):
                if name in {"extended_agent", "__init__"}:
                    continue
                try:
                    module = importlib.import_module(f".{name}", package)
                except Exception:
                    continue
                for attribute_name in dir(module):
                    attribute = getattr(module, attribute_name)
                    if not isinstance(attribute, type):
                        continue
                    try:
                        if not issubclass(attribute, ExtendedAgent):
                            continue
                    except TypeError:
                        continue
                    if attribute is ExtendedAgent:
                        continue
                    if not hasattr(attribute, "metadata"):
                        continue
                    meta_name = attribute.metadata.get("name") or attribute.__name__
                    if meta_name in seen:
                        continue
                    seen.add(meta_name)
                    extensions_metadata.append(attribute.metadata)
        return extensions_metadata
